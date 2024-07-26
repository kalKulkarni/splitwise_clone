// import { useState } from 'react';
// import Layout from '../../components/layout';
// import styles from '../../styles/expense.module.scss';
// import axios from 'axios';
// import { useRouter } from 'next/router';

// const AddExpense = () => {
//   const [amount, setAmount] = useState('');
//   const [payer, setPayer] = useState('');
//   const [participants, setParticipants] = useState('');
//   const [date, setDate] = useState('');
//   const [notes, setNotes] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const expenseData = {
//       amount,
//       payer,
//       participants, 
//       notes
//     };

//     try {
//       await axios.post('http://localhost:3000/expenses/submit-expenses', expenseData, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcyMTYyOTg2OSwiZXhwIjoxNzIxNzE2MjY5fQ.cYNvFBtiXHY_YnQlJ1u26D7F1wpZnmiOEESPxbtwxto"
//         }
//       });
//       router.push('/expenses/get-expenses'); 
//     } catch (error) {
//       console.error('Error submitting expense:', error);
//     }
//   };

//   return (
//     <Layout>
//       <div className={styles.container}>
//         <h1>Add Expense</h1>
//         <form className={styles.form}>
//           <label>
//             Amount:
//             <input
//               type="text"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//             />
//           </label>
//           <label>
//             Payer:
//             <input
//               type="text"
//               value={payer}
//               onChange={(e) => setPayer(e.target.value)}
//             />
//           </label>
//           <label>
//             Participants:
//             <input
//               type="text"
//               value={participants}
//               onChange={(e) => setParticipants(e.target.value)}
//             />
//           </label>
//           <label>
//             Date:
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//             />
//           </label>
//           <label>
//             Notes:
//             <input
//               type="text"
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//             />
//           </label>
//           <button  onSubmit={handleSubmit}  type="submit">Submit Expense</button>
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default AddExpense;


import { useState } from 'react';
import Layout from '../../components/layout';
import styles from '../../styles/expenses/add-expenses.module.scss';
import axios from 'axios';
import { useRouter } from 'next/router';

const AddExpense = () => {
  const [amount, setAmount] = useState('');
  const [payer, setPayer] = useState('');
  const [participants, setParticipants] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const expenseData = {
      amount,
      payer,
      participants: participants.split(',').map(participant => participant.trim()), // convert string to array
      date,
      notes,
    };

    try {
      await axios.post('http://localhost:3000/expenses/submit-expenses', expenseData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYwLCJpYXQiOjE3MjE5NzMxNjgsImV4cCI6MTcyMjA1OTU2OH0.orBYlqBfgxwPknhTOJBP0SVKAlMv5a0W6gG3vj4vb6s"
        }
      });
      router.push('/expenses/get-expenses');
    } catch (error) {
      console.error('Error submitting expense:', error);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Add Expense</h1>       
           <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formControl}>
            <label className={styles.label}>Amount</label>
            <input 
              type="amount" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              className={styles.input} 
              required 
              />
            </div>
            <div className={styles.formControl}>
            <label className={styles.label}>Notes</label>
            <input 
              type="notes" 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
              className={styles.input} 
              required 
              />
            </div>
            <div className={styles.formControl}>
            <label className={styles.label}>Payer</label>
            <input 
              type="payer" 
              value={payer} 
              onChange={(e) => setPayer(e.target.value)} 
              className={styles.input} 
              required 
              />
            </div>
            <div className={styles.formControl}>
            <label className={styles.label}>Participants</label>
            <input 
              type="participants" 
              value={participants} 
              onChange={(e) => setParticipants(e.target.value)} 
              className={styles.input} 
              required 
              />
            </div>
            <div className={styles.formControl}>
            <label className={styles.label}>Date</label>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              className={styles.input} 
              required 
              />
            </div>
          </form>
            <button type="submit" className={styles.submitButton}>Add Expenses </button>
        </div>
      </div>
    </Layout>
  );
};

export default AddExpense;
