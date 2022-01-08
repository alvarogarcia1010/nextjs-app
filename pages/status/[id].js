import Devit from "components/Devit/Devit";
import { firestore } from "firebase/admin";
import { useRouter } from "next/router";
import containerStyles from "styles/Home.module.css";

const DevitPage = (props) => {
  const router = useRouter();

  if (router.isFallback) return <h1>Cargando...</h1>;

  return (
    <div className={containerStyles.container}>
      <main className={containerStyles.main}>
        <Devit {...props} />
      </main>
    </div>
  );
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "2v6O59t32Pr9Kxt1cykC" } }],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const { id } = params;

  return firestore
    .collection("devits")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data();
      const id = doc.id;
      const { createdAt } = data;

      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      };
      return { props };
    })
    .catch(() => {
      return { props: {} };
    });
}

export default DevitPage;
