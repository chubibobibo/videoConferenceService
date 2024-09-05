import CardComponentRegister from "../../components/CardComponentRegister";

/** styled component */
import { Wrapper } from "../../assets/Wrappers/CardWrapper";
import { toast } from "react-toastify";
import axios from "axios";
import { redirect } from "react-router-dom";

/** action function to handle submission of register data */
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  if (data.pwd1 === data.pwd2) {
    data.password = data.pwd1;
  } else {
    return toast.error("Passwords don't match");
  }
  try {
    await axios.post("/api/users/register", data);
    toast.success("New user registered");
    return redirect("/login");
  } catch (err) {
    console.log(err);
    toast.error(
      Array.isArray(err?.response?.data?.message)
        ? err?.response?.data?.message[0]
        : err?.response?.data?.message
    );
    return err;
  }
};

function RegisterPage() {
  return (
    <Wrapper>
      <CardComponentRegister
        title={"Register"}
        btnLabel={"register"}
        linkLabel={"Login"}
        btnType={"submit"}
        linkTxt={"Do you have an account already?"}
        linkRef={"/login"}
      />
    </Wrapper>
  );
}
export default RegisterPage;
