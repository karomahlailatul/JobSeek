import { Fragment, useEffect } from "react";
import Cookies from "js-cookie";
import PreLoader from "../../components/PreLoader";

export const getServerSideProps = async (ctx) => {
  const code = (await ctx?.query?.code) || null;
  let resultEncode;

  // eslint-disable-next-line no-useless-escape
  const notBase64 = /[^A-Z0-9+\/=]/i;

  function isBase64(str) {
    const len = str.length;
    if (!len || len % 4 !== 0 || notBase64.test(str)) {
      return false;
    }
    const firstPaddingChar = str.indexOf("=");
    return firstPaddingChar === -1 || firstPaddingChar === len - 1 || (firstPaddingChar === len - 2 && str[len - 1] === "=");
  }

  if (isBase64(code)) {
    let bufferDataDecode = Buffer.from(code, "base64");
    let resultBase64DataEncode = bufferDataDecode.toString("utf8");
    resultEncode = JSON.parse(resultBase64DataEncode);
  }

  const id = resultEncode?.id || null;
  const token = resultEncode?.token || null;
  const refreshToken = resultEncode?.refreshToken || null;
  const role = resultEncode?.role || null;
  const lockCredential = false;

  return {
    props: {
      token: token,
      id: id,
      role: role,
      refreshToken: refreshToken,
      lockCredential: lockCredential,
    },
  };
};

const SignGoogle = ({ token, id, role, refreshToken, lockCredential }) => {
  useEffect(() => {
    document.title = "Verification Sign | JobSeek";

    if (token != null && refreshToken != null && id != null && role != null && lockCredential != null) {
      Cookies.set("token", token);
      Cookies.set("refreshToken", refreshToken);
      Cookies.set("id", id);
      Cookies.set("role", role);
      Cookies.set("lockCredential", lockCredential);
    }
    return () => {
      setTimeout(() => {
        window.close();
      }, 50);
    };
  }, [token, refreshToken, id, role,lockCredential]);

  const isLoading = true;
  return (
    <Fragment>
      <PreLoader isLoading={isLoading} />
    </Fragment>
  );
};

export default SignGoogle;
