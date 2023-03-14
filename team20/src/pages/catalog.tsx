import Navbar from '../components/Navbar';

export default function Account() {
    return (
        <>
        <div>
            <Navbar/>
        </div>
        <h1>Catalog</h1>
        <table>
            <th> Product ID     </th>
            <th> Name           </th>
            <th> Price          </th> 
            <th> Description    </th>            
        </table>
        </>
    );
}

