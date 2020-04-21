import {useState} from 'react';
import Pagination from '../components/Pagination'

function HomePage() {
    const arrayOfItems = [...Array(250).keys()].map(i => ({ id: (i+1), name: `Product ${i + 1}` }));

    const [exampleItems, setExampleItems] = useState(arrayOfItems)
    const [pageOfItems, setPageOfItems] = useState([])

    const onChangePage = (pageOfItems) => {
        setPageOfItems(pageOfItems);
    }

        return (
            <div>
                <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />
                <div className="container">
                    <div className="text-center">
                        <h1>Example Pagination with React Hooks</h1>
                        {pageOfItems.map(item =>
                            <div key={item.id}>{item.name}</div>
                        )}
                        <Pagination items={exampleItems} onChangePage={onChangePage} />
                    </div>
                </div>
                <hr />
            </div>
        );
  }
  
  export default HomePage