/** material tailwind */
import CardComponent from "../../components/CardComponent";

/** styled components */
import { Wrapper } from "../../assets/Wrappers/CardWrapper";

import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

/** @formData obtains data from the forms */
/** @data converts the data from forms to usable objects */
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await axios.post("/api/users/login", data);
    toast.success("User is logged in");
    return redirect("/");
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

function LoginPage() {
  return (
    <Wrapper>
      <CardComponent
        title={"Login"}
        btnLabel={"Login"}
        linkLabel={"Register"}
        btnType={"submit"}
      />
    </Wrapper>
  );
}
export default LoginPage;
