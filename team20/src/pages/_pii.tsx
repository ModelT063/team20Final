import Navbar from '../components/Navbar';
export default function () {
    return (
        <>
            <div>
            <Navbar/>
            </div>
            <h1>User Information</h1>
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
      </>   
    );
}

