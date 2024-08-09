import { useEffect, useState } from "react";

function LinkComponent({file, download, children}:{file: Blob, download: string, children: React.ReactNode}) {
  const [href, setHref] = useState('');
  useEffect(() => {
    const url = URL.createObjectURL(file);
    setHref(url);

    return () => URL.revokeObjectURL(url);
  }, [file])
  return ( <a href={href} download={download}>
    {children}
  </a> );
}

export default LinkComponent;