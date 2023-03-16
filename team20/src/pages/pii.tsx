import Navbar from "../components/Navbar";
export default function pii() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <h1>User Information</h1>
      <body>
        Please enter your personal information into the form below to update your account      
        <form>
          <label>
            First Name:
            <input type="text" name="firstName" /> <br></br>
          </label>
          <label>
            Last Name:
            <input type="text" name="lastName" /> <br></br>
          </label>
          <label>
            Email:
            <input type="text" name="email" /> <br></br>
          </label>
          <label>
            Date of Birth:
            <input type="text" name="dateOfBirth" /> <br></br>
          </label>
          <label>
            Address:
            <input type="text" name="address" /> <br></br>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </body>
    </>
  );
}
