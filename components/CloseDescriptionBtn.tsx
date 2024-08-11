import { useRouter } from 'next/router';

function CloseDescriptionBtn() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        const updatedURL = {
          pathname: '/',
          query: { ...router.query },
        };
        delete updatedURL.query.name;
        router.push(updatedURL);
      }}
    >
      Close the Description
    </button>
  );
}

export default CloseDescriptionBtn;
