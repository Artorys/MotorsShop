import { Box } from "@chakra-ui/react"
import { ReactElement } from "react"

interface IBackgroundProps{
    purpleHeight : string
    children : ReactElement
}
export function Background(props : IBackgroundProps){
   return <Box mt={"40px"} width={"100%"} height={"100%"} backgroundColor="greyScale.grey10">
            <Box top={"20"} width={"100%"} height={props.purpleHeight} position={"absolute"} backgroundColor="brand.brand1"></Box>
            {props.children}
          </Box>

}