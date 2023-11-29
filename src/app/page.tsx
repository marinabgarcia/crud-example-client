import Image from "next/image";
import styles from "./page.module.css";
import ClientList from "@/components/client/ClientList";

export default function Home() {
    return <ClientList />;
}
