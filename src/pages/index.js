import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import Edit from './components/Edit';
import Table from './components/Table';

export default function Home() {
  return (
    <div className={styles.container}>
      <Table />
      <Edit />
    </div>
  );
}
