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
import styles from '../../styles/expenses/expense.module.scss';
import axios from 'axios';
import Link from 'next/link';
import { FaAd, FaEdit, FaPlus, FaPlusCircle, FaTrash } from 'react-icons/fa';
import { IoAddCircle } from "react-icons/io5";
import ReactTooltip from 'react-tooltip';

import router from 'next/router';

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
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYwLCJpYXQiOjE3MjE5NzMxNjgsImV4cCI6MTcyMjA1OTU2OH0.orBYlqBfgxwPknhTOJBP0SVKAlMv5a0W6gG3vj4vb6s"
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
  const addExpenseNavigation = () => {
    router.push('/expenses/add-expenses')
  }
  const handleEdit = (id: number) => {
    router.push(`/expenes/edit-expenses/id=${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:3000/expenses/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYwLCJpYXQiOjE3MjE5NzMxNjgsImV4cCI6MTcyMjA1OTU2OH0.orBYlqBfgxwPknhTOJBP0SVKAlMv5a0W6gG3vj4vb6s"
        }
      });
      setExpenses(response.data);
      console.log(response.data, 'data data ::::::');
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Expense List</h1>
        <IoAddCircle onClick={addExpenseNavigation} className={styles.addIcon} data-tip="Add Expense"/>
      </div>
        <div className={styles.expenseList}>
          {expenses.map((expense) => (
            <div className={styles.card}>
              <div className={styles.cardContent}>
                <h3>{expense.notes}</h3>
                <p>{expense.payer}</p>
                <p>Participants: {Array.isArray(expense.participants) ? expense.participants.join(', ') : 'No Participants'}</p>
                <p>{expense.date}</p>
                <p>{expense.amount}</p>
              </div>
              <div className={styles.cardActions}>
                <FaEdit onClick={() => handleEdit(expense.id)} className={styles.icon} />
                <FaTrash onClick={() => handleDelete(expense.id)} className={styles.icon} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default GetExpenses;
