import Script from 'next/script';

declare global {
  interface Window {
    userledSettings: {
      app_id: string;
    };
    userledSnippetTs: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Userled: any;
  }
}

const UserLed = () => {
  return (
    <>
      <Script id='userled-sdk-snippet'>
        {`
  window.userledSettings={app_id:"8850cf79-153c-4311-9afd-ea49ca4cdd60"},window.userledSnippetTs=(new Date).getTime(),(function(){if(!window.Userled){window.Userled=function(){return e.call(arguments)};var e=window.Userled;e.call=function(n){return new Promise((function(i,d){e.queue.push([].concat.apply([i,d],n))}))},e.queue=[],e.snippetVersion="4.0.0",window.Userled("page")}})();`}
      </Script>
      <Script
        id='userled-sdk'
        type='module'
        src='https://sdk.userledclient.io?appId=8850cf79-153c-4311-9afd-ea49ca4cdd60&snippetVersion=4.0.0'
        data-cfasync='false'
      />
    </>
  );
};

export default UserLed;
