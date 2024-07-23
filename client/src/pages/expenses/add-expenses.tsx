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
import styles from '../../styles/expense.module.scss';
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
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcyMTc0MTMxOCwiZXhwIjoxNzIxODI3NzE4fQ.2JpE1_3xARCU1dQIQOoSvnvpKHQRz6ljZX4d9xlPTBc"
        }
      });
      router.push('/expenses/get-expenses'); // redirect to expenses page after successful submission
    } catch (error) {
      console.error('Error submitting expense:', error);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h1>Add Expense</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Amount:
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
          <label>
            Payer:
            <input
              type="text"
              value={payer}
              onChange={(e) => setPayer(e.target.value)}
            />
          </label>
          <label>
            Participants:
            <input
              type="text"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label>
            Notes:
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>
          <button type="submit">Submit Expense</button>
        </form>
      </div>
    </Layout>
  );
};

export default AddExpense;
