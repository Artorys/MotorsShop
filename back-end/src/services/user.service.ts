import {
  IResetPassword,
  IResetPasswordData,
} from "./../interfaces/resetPassword.interface";
import { QueryFailedError } from "typeorm";
import {
  IUserCreate,
  IUserUpdate,
  IUserUpdateRequest,
} from "./../interfaces/requests.interface";
import AppDataSource from "../data-source";
import { User } from "../entities/user";
import bcrypt, { compare } from "bcryptjs";
import { AppError, ErrorResponse } from "../Error/ErrorResponse";
import { instanceToPlain } from "class-transformer";
import { Address } from "../entities/address";
import {
  IAddressCreate,
  IAddressUpdate,
} from "../interfaces/address.interface";
import { ILogin } from "../interfaces/login.interface";
import { sign } from "jsonwebtoken";
import { createHmac } from "crypto";
import { hash } from "bcrypt";
import { resetPasswordSchema } from "../schemas/password.schema";
import { sendEmail } from "../utils/mailer.util";
import { IEmailRequest } from "../interfaces/email.interface";

const userRepository = AppDataSource.getRepository(User);

export async function userCreateService(
  {
    accountType,
    full_name,
    email,
    cpf,
    phone,
    birthDate,
    description,
    password,
  }: IUserCreate,
  addressData: IAddressCreate,
  protocol: string,
  host: string | undefined
): Promise<User> {
  const addressRepository = AppDataSource.getRepository(Address);

  const userEmail = await userRepository.findOneBy({ email });
  if (userEmail) {
    throw new ErrorResponse("Email already been used");
  }

  const addressInstance = addressRepository.create(addressData);
  const address = await addressRepository.save(addressInstance);

  const tokenActivationData = (Math.random() + 1).toString(36).substring(2);

  const createdUser = userRepository.create({
    accountType,
    full_name,
    email,
    cpf,
    phone,
    birthDate,
    description,
    password: bcrypt.hashSync(password, 10),
    address,
    isActive: false,
    token_activation: tokenActivationData,
  });

  const emailData: IEmailRequest = {
    subject: "Ativação de usuário",
    text: `<h1>Confirmação do cadastro</h1> 
    <p>Prezado(a) ${full_name}. 
    Esse e-mail é automatico então por favor, não responda.</p> 
    <P>confirme seu cadastro através do link: ${protocol}://${host}/user/activate/${tokenActivationData}</P> 
    <b><h4>Atenciosamente</h4> <h4>Equipe de suporte 💻</h4></b>`,
    to: email,
  };

  await sendEmail(emailData);

  await userRepository.save(createdUser);

  return createdUser;
}

export async function userDeleteService(id: string) {
  const user = await userRepository.findOneBy({ id: id });

  if (!user.isActive) {
    throw new Error("User already deactivated");
  }

  user.isActive = false;

  userRepository.save(user);
}

export async function userListSpecificService(id: string) {
  const user = await userRepository.findOneBy({ id: id });

  if (!user) {
    throw new Error("User not found");
  }

  return instanceToPlain(user);
}
export async function userLoginService(data: ILogin) {
  const email = data.email;
  const password = data.password;

  const user = await userRepository.findOneBy({ email: email });

  if (!user) {
    throw new ErrorResponse("Email or password not valid", 400);
  }

  const isValidPassword = await compare(password, user.password);

  if (!isValidPassword) {
    throw new ErrorResponse("Email or password not valid", 400);
  }

  const token = sign({ id: user.id }, process.env.SECRET_KEY, {
    expiresIn: "24h",
    subject: user.id,
  });

  return token;
}

export const userUpdateService = async (id: string, data: IUserUpdate) => {
  try {
    const userUpdated = await userRepository.findOneBy({
      id: id,
    });

    if (!userUpdated) {
      throw new Error("User not found");
    }

    for (const prop in data) {
      if (data[prop]) {
        if (prop != "address") {
          userUpdated[prop] = data[prop];
        }
      }
    }
    for (const prop in data.address) {
      if (data.address[prop]) {
        userUpdated.address[prop] = data.address[prop];
      }
    }

    return instanceToPlain(userRepository.save(userUpdated));
  } catch (error) {
    throw new Error(error);
  }
};

export const activateUserService = async (
  tokenActivation: string
): Promise<void> => {
  const user = await userRepository.findOne({
    where: {
      token_activation: tokenActivation,
    },
  });

  if (!user) {
    throw new AppError(404, "Usuário não encontrado");
  }

  await userRepository.update(
    {
      id: user.id,
    },
    {
      isActive: true,
      token_activation: "",
    }
  );
};

export const forgotPassword = async (
  data: IResetPassword,
  resetData: IResetPasswordData
) => {
  try {
    const email = data.email;

    const user = await userRepository.findOneBy({ email: email });

    if (!user) {
      throw new ErrorResponse("EUsuário não encontrado");
    }

    const token = createHmac("sha256", "a secret");

    const now = new Date();
    now.setHours(now.getHours() + 1);

    for (const prop in resetData) {
      if (resetData[prop]) {
        if (prop == "password") {
          user[prop] = resetData[prop];
        }
      }
    }

    return instanceToPlain(userRepository.save(user));
  } catch (error) {
    throw new Error(error);
  }
};
