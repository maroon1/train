import { Center } from "./center";
import { FontAwesomeIcon } from "./icon";

export function Empty(props) {
  return (
    <Center style={{ height: 200 }}>
      <p>{props.message}</p>
    </Center>
  );
}

export function Loading() {
  return (
    <Center style={{ height: 200 }}>
      <FontAwesomeIcon size={48} name="spinner" className="fa-spin-pulse" />
    </Center>
  );
}
