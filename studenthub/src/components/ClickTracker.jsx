import { useRef } from "react";

function ClickTracker() {
  const clickCount = useRef(0);
	console.log("Component rendered");

  return (
    <div>
      <button
      	onClick={() => {
      		clickCount.current += 1;
					console.log(clickCount.current);
        }}
      >
        Track Click
			
			</button>
    </div>
  );
}

export default ClickTracker;