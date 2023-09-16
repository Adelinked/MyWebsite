/**** page not used for the moment ****/

import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ProjectDetails } from "../../components/ProjectDetails";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorageValue } from "@mantine/hooks";
//import axios from "axios";

export default function OneProject({}) {
  const { query } = useRouter();
  const [projectCli, setProjectCli] = useState();
  const [loading, setLoading] = useState(false);
  const { projects, current } = useSelector((state) => state.projects);

  const [currProdLocal, setCurrProdLocal] = useLocalStorageValue({
    key: "currProd",
  });
  const project = projects[current - 1] ?? currProdLocal.currProd;

  useEffect(() => {
    getProject();
  }, [query]);

  const getProject = async () => {
    setLoading(true);
    const url = `/api/${query.id}`;
    //const data = await axios.get(url);
    setProjectCli(data.data[0]);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Adelinked One Project</title>
        <meta name="description" content="Adelinked website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!loading && (
        <div>
          <ProjectDetails {...projectCli} />
        </div>
      )}
      {loading && <div>...loading</div>}
    </>
  );
}
/*
export async function getServerSideProps(context) {
  const id = context.query.id;
  const url = `https://fakestoreapi.com/products/${id}`;

  const data = await axios.get(url);
  return { props: { productServ: data.data } };
}*/
