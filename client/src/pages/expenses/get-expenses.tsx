// import { ReactNode, useEffect, useState } from 'react';
// import Layout from '../../components/layout';
// import styles from '../../styles/expense.module.scss';
// import axios from 'axios';
// import Link from 'next/link';
// import router from 'next/router';
// // import { headers } from 'next/headers';
// interface Expense {
//   notes: ReactNode;
//   payer: ReactNode;
//   participants: any;
//   id: number;
//   description: string;
//   amount: number;
//   date: string;
// }

// const GetExpenses = () => {
//   const [expenses, setExpenses] = useState<Expense[]>([]);

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/expenses/get-expenses', {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcyMTYyOTg2OSwiZXhwIjoxNzIxNzE2MjY5fQ.cYNvFBtiXHY_YnQlJ1u26D7F1wpZnmiOEESPxbtwxto"
//           }
//         });
//         router.push('/expenses/get-expenses');
//         setExpenses(response.data);
//         console.log(response.data, 'data data ::::::');

//       } catch (error) {
//         console.error('Error fetching expenses:', error);
//       }
//     };

//     fetchExpenses();
//   }, []);


//   return (
//     <Layout>
//       <div className={styles.container}>
//       <Link href="/expenses/add-expenses">
//           <span className={styles.addButton}>Add Expense</span>
//         </Link>
//         <h1 className={styles.title}>Expense List</h1>
//         <ul className={styles.expenseList}>
//           <div>
//             {Object.entries(expenses).map(([id, expense]) => (
//               <div key={id}>
//                 <h3>{expense.amount}</h3>
//                 <p>{expense.payer}</p>
//                 <p>Participants:{Array.isArray(expense.participants) ? expense.participants.join(',') : 'No Participants'}</p>
//                 <p>{expense.date}</p>
//                 <p>{expense.notes}</p>
//                 <div className={styles.signup}>
//                 </div>
//               </div>

//             ))}
//           </div>
//         </ul>
        
//       </div>
//     </Layout>
//   );
// };

// export default GetExpenses;


import { ReactNode, useEffect, useState } from 'react';
import Layout from '../../components/layout';
import styles from '../../styles/expense.module.scss';
import axios from 'axios';
import Link from 'next/link';

interface Expense {
  notes: ReactNode;
  payer: ReactNode;
  participants: any;
  id: number;
  description: string;
  amount: number;
  date: string;
}

const GetExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/expenses/get-expenses', {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcyMTYyOTg2OSwiZXhwIjoxNzIxNzE2MjY5fQ.cYNvFBtiXHY_YnQlJ1u26D7F1wpZnmiOEESPxbtwxto"
        }
      });
      setExpenses(response.data);
      console.log(response.data, 'data data ::::::');
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        <Link href="/expenses/add-expenses">
          <span className={styles.addButton}>Add Expense</span>
        </Link>
        <h1 className={styles.title}>Expense List</h1>
        <ul className={styles.expenseList}>
          <div>
            {expenses.map((expense) => (
              <div key={expense.id}>
                <h3>{expense.amount}</h3>
                <p>{expense.payer}</p>
                <p>Participants: {Array.isArray(expense.participants) ? expense.participants.join(', ') : 'No Participants'}</p>
                <p>{expense.date}</p>
                <p>{expense.notes}</p>
                <Link href={'/expenses/edit-expenses'}>
                <span>Edit Expenses</span></Link>
              </div>
            ))}
          </div>
        </ul>
      </div>
    </Layout>
  );
};

export default GetExpenses;
