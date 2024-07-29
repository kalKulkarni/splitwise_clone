// import { ReactNode, useEffect, useState } from 'react';
// import Layout from '../../components/layout';
// import styles from '../../styles/expenses/expense.module.scss';
// import axios from 'axios';
// import Link from 'next/link';
// import { FaAd, FaEdit, FaPlus, FaPlusCircle, FaTrash } from 'react-icons/fa';
// import { IoAddCircle } from "react-icons/io5";
// import ReactTooltip from 'react-tooltip';

// import router from 'next/router';

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

//   const fetchExpenses = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/expenses/get-expenses', {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYwLCJpYXQiOjE3MjIyNDQxNTYsImV4cCI6MTcyMjMzMDU1Nn0._UVyAwmDvSSF-QeRGGiZ_IbS1V7kq9Y_vbxdRK8ifiM"
//         }
//       });
//       setExpenses(response.data);
//       console.log(response.data, 'data data ::::::');
//     } catch (error) {
//       console.error('Error fetching expenses:', error);
//     }
//   };

//   useEffect(() => {
//     fetchExpenses();
//   }, []);
//   const addExpenseNavigation = () => {
//     router.push('/expenses/add-expenses')
//   }
//   const handleEdit = (id: number) => {
//     router.push(`/expenes/edit-expenses/id=${id}`);
//   };

//   const handleDelete = async (id: number) => {

//     try {
//       const response = await axios.delete(`http://localhost:3000/expenses/${id}`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYwLCJpYXQiOjE3MjIyNDQxNTYsImV4cCI6MTcyMjMzMDU1Nn0._UVyAwmDvSSF-QeRGGiZ_IbS1V7kq9Y_vbxdRK8ifiM"
//         }
//       });
//       setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
//       console.log(response.data, 'data data ::::::');
//     } catch (error) {
//       console.error('Error fetching expenses:', error);
//     }
//   };

//   return (
//     <Layout>
//       <div className={styles.container}>
//       <div className={styles.header}>
//         <h1 className={styles.title}>Expense List</h1>
//         <IoAddCircle onClick={addExpenseNavigation} className={styles.addIcon} data-tip="Add Expense"/>
//       </div>
//         <div className={styles.expenseList}>
//           {expenses.map((expense) => (
//             <div className={styles.card}>
//               <div className={styles.cardContent}>
//                 <h3>{expense.notes}</h3>
//                 <p>{expense.payer}</p>
//                 <p>Participants: {Array.isArray(expense.participants) ? expense.participants.join(', ') : 'No Participants'}</p>
//                 <p>{expense.date}</p>
//                 <p>{expense.amount}</p>
//               </div>
//               <div className={styles.cardActions}>
//                 <FaEdit onClick={() => handleEdit(expense.id)} className={styles.icon} />
//                 <FaTrash onClick={() => handleDelete(expense.id)} className={styles.icon} />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default GetExpenses;



import React, { ReactNode, useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Layout from '@/components/layout';
import styles from '../../styles/expenses/expense.module.scss';
import { IoAddCircle } from 'react-icons/io5';
import router from 'next/router';
import { FaEdit, FaTrash } from 'react-icons/fa';

Modal.setAppElement('#__next'); // or whatever your root element is
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/expenses/get-expenses', {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYwLCJpYXQiOjE3MjIyNDQxNTYsImV4cCI6MTcyMjMzMDU1Nn0._UVyAwmDvSSF-QeRGGiZ_IbS1V7kq9Y_vbxdRK8ifiM"
        }
      });
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);
  const addExpenseNavigation = () => {
    router.push('/expenses/add-expenses/')
  }

  const handleEdit = (id: number) => {
    router.push(`/expenses/edit-expenses/id=${id}`);
  };
  const openModal = (expense: Expense) => {
    setSelectedExpense(expense);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedExpense(null);
    setModalIsOpen(false);
  };

  const handleDelete = async () => {
    if (selectedExpense) {
      try {
        await axios.delete(`http://localhost:3000/expenses/${selectedExpense.id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYwLCJpYXQiOjE3MjIyNDQxNTYsImV4cCI6MTcyMjMzMDU1Nn0._UVyAwmDvSSF-QeRGGiZ_IbS1V7kq9Y_vbxdRK8ifiM"
          }
        });

        setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== selectedExpense.id));
        closeModal();
      } catch (error) {
        console.error('Error deleting expense:', error);
        alert('Failed to delete the expense. Please try again.');
      }
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Expense List</h1>
          <IoAddCircle onClick={addExpenseNavigation} className={styles.addIcon} data-tip="Add Expense" />
        </div>
        <div className={styles.expenseList}>
          {expenses.map((expense) => (
            <div key={expense.id} className={styles.card}>
              <div className={styles.cardContent}>
                <h3>{expense.notes}</h3>
                <p>{expense.payer}</p>
                <p>Participants: {Array.isArray(expense.participants) ? expense.participants.join(', ') : 'No Participants'}</p>
                <p>{expense.date}</p>
                <p>{expense.amount}</p>
              </div>
              <div className={styles.cardActions}>
                <FaEdit onClick={() => handleEdit(expense.id)} className={styles.icon} />
                <FaTrash onClick={() => openModal(expense)} className={styles.icon} />
              </div>
            </div>
          ))}
        </div>
        {selectedExpense && (
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Confirm Delete" className={styles.modal} overlayClassName={styles.overlay}
>
            <h2 className={styles.modalTitle}>Confirm Delete</h2>
            <p className={styles.modelpara}>Are you sure you want to delete the expense with notes: "{selectedExpense.notes}?</p>
            <div className={styles.modalActions}>
              <button onClick={handleDelete} className={styles.modalButton}>Yes, Delete</button>
              <button onClick={closeModal} className={styles.modalButton}>Cancel</button>
            </div>
          </Modal>
        )}
      </div>
    </Layout>
  );
};

export default GetExpenses;
