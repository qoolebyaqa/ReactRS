function Pagination({onNext, onPrev, currentPage, totalLength}: {onNext: () => void, onPrev: () => void, currentPage: number, totalLength: number}) {
  return ( <div style={{display: "flex", gap: "4px", justifyContent: "center"}}>
    <button onClick={onPrev} disabled={currentPage === 1}>↩</button>
    <p data-testid="test-2">{currentPage}</p>
    <button onClick={onNext} disabled={currentPage === Math.ceil(totalLength / 10)}>↪</button>
  </div> );
}

export default Pagination;