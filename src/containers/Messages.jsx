import React from "react";
import { ChatController, MuiChat } from "chat-ui-react";
import axios from 'axios'

export default function Messages(props) {
  const [chatCtl] = React.useState(new ChatController());

  React.useEffect(() => {
    // Chat content is displayed using ChatController

    const postMessage = async (message) => {
        const post = {
            body: message,
            user_id: props.user.id,
            conversation_id: props.convo.id
        }
        try{
            const res = await axios.post('/messages', post)
            console.log(res.data)
            const formattedMessage = {
                type: 'text',
                content: res.data.body,
                self: res.data.user_id == props.user.id,
            }
            const rock = {message: res.data}
            await props.updateConvo(rock)
        }
        catch(error){
            console.log(error)
        }
    }
    const messages =  props.convo.messages.map((message) => {
      return {
        type: "text",
        content: message.body,
        self: message.user_id == props.user.id,
      };
    });
    chatCtl.setMessages(messages);
    const n = chatCtl.setActionRequest({ type: "text", always: true }, (response) => {
        postMessage(response.value)
    });
  }, [props]);

//   React.useEffect(() => {
//       if(props.message){
//         const message = {
//             type: 'text',
//             content: props.message.body,
//             self: props.message.user_id == props.user.id
//         }
//         chatCtl.addMessage(message)
//       }
//   },[props.message])

  // Only one component used for display
  return <MuiChat id="chatput" chatController={chatCtl} />;
}
