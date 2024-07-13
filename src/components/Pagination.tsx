function Pagination({onNext, onPrev, currentPage, totalLength}: {onNext: () => void, onPrev: () => void, currentPage: number, totalLength: number}) {
  console.log(totalLength)
  return ( <div style={{display: "flex", gap: "4px", justifyContent: "center"}}>
    <button onClick={onPrev} disabled={currentPage === 1}>↩</button>
    <p>{currentPage}</p>
    <button onClick={onNext} disabled={currentPage === Math.ceil(totalLength / 10)}>↪</button>
  </div> );
}

export default Pagination;