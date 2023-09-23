import { collection, query, where, getDocs } from 'firebase/firestore';
import { useState } from 'react';
import { db} from "../firebase";


function Search() {
    const [searched, setsearched] = useState("");
    const [searchResults, setsearchResults] = useState('')

    const handleSearchInputChange=(e)=>{
        setsearched(e.target.value)
    }
    const handleSearch = async () => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', searched));

    try {
        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map((doc) => doc.data());
        setsearchResults(results);
    } catch (error) {
        console.error('Error searching users:', error);
    }
    };
    return (
        <div>
        <input
        type="text"
        placeholder="Search users..."
        value={searched}
        onChange={handleSearchInputChange}
      />
        <button onClick={handleSearch}>Search</button>
        {searchResults.map((user) => (
            <div key={user.id}>
            <h3>{user.username}</h3>
            {/* Display other user information here */}
            </div>
        ))}
        </div>
    );
}
export default Search;