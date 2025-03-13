import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";

export const CompoSuspendu = () => {
  return (
    <Suspense fallback={<Loader />}>
      <CmpA />
    </Suspense>
  );
};

const Loader = () => <div>Loading</div>;

const k = () => ["osef"];

const fakeFetch = (): Promise<string> =>
  // Using a Promise with setTimeout to simulate async work:
  new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hello from a fake fetch!");
    }, 5000);
  });

const asyncReturn = (data: string): Promise<string> =>
  // Using a Promise with setTimeout to simulate async work:
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 0);
  });

const useFakeData = () => {
  const { data } = useSuspenseQuery({
    queryKey: k(),
    queryFn: () => fakeFetch(),
  });

  return data;
};

const k2 = () => ["osef2"];

const useAsyncDataEvenIfCache = () => {
  const data1 = useFakeData();
  const { data } = useSuspenseQuery({
    queryKey: k2(),
    queryFn: () => asyncReturn(`${data1}test`),
  });
  return data;
};

const CmpA = () => {
  const queryClient = useQueryClient();

  const data = useAsyncDataEvenIfCache();

  useEffect(() => {
    return () => {
      queryClient.resetQueries({ queryKey: ["osef2"] });
      queryClient.removeQueries({ queryKey: ["osef2"] });
    };
  }, []);

  return (
    <div>
      {data}
      <CmpB />
    </div>
  );
};

const CmpB = () => {
  for (let i = 0; i < 10_000; i++) {
    console.log(i);
  }

  return <div>Rien</div>;
};
