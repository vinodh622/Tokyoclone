


export function pushAction(api_token,device_token,device_type,login_type) {

    let abort = new AbortController();
    var form = new FormData();
    form.append('api_token', api_token);
    form.append('device_token', device_token);
    form.append('device_type', device_type);
    form.append('login_type', login_type);

    console.log('firebase form',form)
    fetch(
      'http://sos.shiftlogics.com/api/user/firebase',
      {
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        }),
        body: form,
      },
      {signal: abort.signal},
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('datadatadatadata firebase',data)
      })
      .catch((e) => console.log(e));
    return () => {
      abort.abort();
    };

}

