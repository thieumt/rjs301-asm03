// export const CustomerSend = (state, action) => {
//    switch (action.type) {
//      case 'customerSend':
//        const { payload } = action;
//        const currentDate = new Date().toLocaleString('vi-VN', { hour12: false });
//        const updatedChatContent = [
//          ...state.chatContent,
//          payload,
//          currentDate
//        ];
//        console.log(currentDate);
       
//        return {
//          ...state,
//          infoChat: {
//            ...state.infoChat,
//            customerSend: payload,
//            date: currentDate
//          },
//          chatContent: updatedChatContent
//        };
       
//      // Các case khác...
     
//      default:
//        return state;
//    }
//  };
 
//  export const ConsultantSend = (state, action) => {
//     switch (action.type) {
//       case 'consultantSend':
//         const { payload } = action;
//         const currentDate = new Date().toLocaleString('vi-VN', { hour12: false });
//         const updatedChatContent = [
//           ...state.chatContent,
//           payload,
//           currentDate
//         ];
        
//         return {
//           ...state,
//           infoChat: {
//             ...state.infoChat,
//             consultant: payload,
//             date: currentDate
//           },
//           chatContent: updatedChatContent
//         };
        
      
//       default:
//         return state;
//     }
//  };