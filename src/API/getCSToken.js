const headers = new Headers({
  Authorization: `Basic ${btoa(
    process.env.REACT_APP_CLIENT_ID + ":" + process.env.REACT_APP_CLIENT_SECRET
  )}`,
});
const requestOptions = {
  method: "POST",
  headers: headers,
  redirect: "follow",
};

export const getCTToken = async () => {
  const getToken = await fetch(
    "https://@auth.us-central1.gcp.commercetools.com/oauth/token?grant_type=client_credentials",
    requestOptions
  );
  const token = await getToken.json();

  return token;
};
