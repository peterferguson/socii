export default function CryptoHome() {
  return (
    <div className="flex items-center justify-center h-screen mx-auto text-5xl font-primary text-brand">
      {"Feeds coming soon!"}
    </div>
  )
}

// // @flow
// import React, { Component } from 'react';

// import {
//   StreamApp,
//   StatusUpdateForm,
//   FlatFeed,
//   NotificationDropdown,
//   Activity,
//   LikeButton,
//   CommentField,
//   CommentList,
//   CommentItem,
//   InfiniteScrollPaginator,
// } from 'react-activity-feed';
// import 'react-activity-feed/dist/index.es.css';

// const apiKey = 'sesb46h7zb6p';
// const appId = '66001';
// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmF0bWFuIn0.8aYd7O_fx-1YMx28DXG1n274o4pa3SjHnRM8AIHLqkE';

// export default class App extends Component<{}> {
//   containerRef = React.createRef();

//   render() {
//     return (
//       <div
//         ref={this.containerRef}
//         style={{
//           maxWidth: '600px',
//           // maxHeight: '500px',
//           // overflow: 'scroll',
//           margin: '0 auto',
//         }}
//       >
//         <StreamApp apiKey={apiKey} appId={appId} token={token}>
//           <div
//             style={{
//               background: '#fff', //#1A1A14
//               height: 60,
//               borderRadius: 4,
//               margin: '10px 0',
//               padding: '0 20px',
//               boxShadow: '0px 0px 4px rgba(0,0,0,0.15)',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               flexDirection: 'row',
//             }}
//           >
//             <h3>React Activity Feed</h3>
//             <NotificationDropdown arrow right />
//           </div>
//           <StatusUpdateForm
//           // submitHandler={(e) => {
//           //   alert(e);
//           // }}
//           />
//           <FlatFeed
//             feedGroup="user" // or timeline
//             notify
//             options={{
//               limit: 6,
//               // withOwnChildren: true,
//               // withRecentReactions: true
//             }}
//             Paginator={(props) => (
//               <InfiniteScrollPaginator
//                 useWindow={false}
//                 threshold={10}
//                 {...props}
//                 getScrollParent={() => this.containerRef}
//               />
//             )}
//             Activity={(activityProps) => (
//               <Activity
//                 {...activityProps}
//                 Footer={() => (
//                   <React.Fragment>
//                     <CommentField
//                       activity={activityProps.activity}
//                       onAddReaction={activityProps.onAddReaction}
//                     />
//                     <CommentList
//                       activityId={activityProps.activity.id}
//                       CommentItem={(props) => (
//                         <React.Fragment>
//                           <CommentItem {...props} />
//                           <LikeButton
//                             reaction={props.comment}
//                             {...activityProps}
//                           />
//                         </React.Fragment>
//                       )}
//                     />
//                   </React.Fragment>
//                 )}
//               />
//             )}
//           />
//         </StreamApp>
//       </div>
//     );
//   }
// }

// import React from 'react';

// import {
//   StreamApp,
//   StatusUpdateForm,
//   FlatFeed,
//   NotificationDropdown,
//   Activity,
//   ActivityFooter,
//   LikeButton,
//   CommentField,
//   CommentList,
//   CommentItem,
//   InfiniteScrollPaginator,
// } from 'react-activity-feed';
// import 'react-activity-feed/dist/index.css';
// import './app.css';

// const apiKey = 'sesb46h7zb6p';
// const appId = '66001';
// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmF0bWFuIn0.8aYd7O_fx-1YMx28DXG1n274o4pa3SjHnRM8AIHLqkE';

// function App() {
//   return (
//     <div style={{ maxWidth: '600px', margin: '0 auto' }}>
//       <StreamApp apiKey={apiKey} appId={appId} token={token}>
//         <div className="wrapper box">
//           <h3>React Activity Feed</h3>
//           <NotificationDropdown right />
//         </div>
//         <StatusUpdateForm />
//         <FlatFeed
//           notify
//           feedGroup="user"
//           options={{ limit: 6, withOwnChildren: true, withRecentReactions: true }}
//           Paginator={InfiniteScrollPaginator}
//           Activity={({ activity, feedGroup, userId }) => (
//             <Activity
//               activity={activity}
//               feedGroup={feedGroup}
//               userId={userId}
//               Footer={() => (
//                 <>
//                   <ActivityFooter activity={activity} feedGroup={feedGroup} userId={userId} />
//                   <CommentField activity={activity} />
//                   <CommentList
//                     activityId={activity.id}
//                     CommentItem={({ comment }) => (
//                       <div className="wrapper">
//                         <CommentItem comment={comment} />
//                         <LikeButton reaction={comment} />
//                       </div>
//                     )}
//                   />
//                 </>
//               )}
//             />
//           )}
//         />
//       </StreamApp>
//     </div>
//   );
// }
// export default App;
