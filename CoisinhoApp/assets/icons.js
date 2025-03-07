import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

export const icons = {
    index: (props)=> <FontAwesome5 name="tasks" size={20} {...props} />,
    explore: (props)=> <FontAwesome5 name="shopping-cart" size={20} {...props} />,
    create: (props)=> <AntDesign name="pluscircleo" size={20} {...props} />,
    profile: (props)=> <AntDesign name="user" size={20} {...props} />,
}