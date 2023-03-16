import Navbar from '../components/Navbar';
//import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
//<svg data-testid="ShoppingCartIcon"></svg>

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

