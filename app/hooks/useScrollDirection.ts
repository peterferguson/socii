import {
  RefObject, useEffect,
  useRef,
  useState
} from "react";
import { useScroll } from "react-use";

interface ScreenPosition {
  x: number;
  y: number;
}
interface Directions extends Object {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
}
type Direction = keyof Directions;

export const useScrollDirection = (ref: RefObject<HTMLElement>): Directions => {
  const lastPosition = useRef<ScreenPosition>({ x: 0, y: 0 });
  const [directions, setDirections] = useState<Directions>({
    left: false,
    right: false,
    up: false,
    down: false,
  });
  const { x, y } = useScroll(ref);

  console.log("coords: ", x, y);

  useEffect(() => {
    const toggleDirection = (direction: Direction) => setDirections((prevState) => ({
      ...prevState,
      [direction]: !directions[direction],
    }));
    const container = ref.current;

    console.log(ref);

    if (!container)
      return;

    if (x > lastPosition.current?.x) {
      lastPosition.current.x = x;
      toggleDirection("right");
    } else if (x < lastPosition.current?.x) {
      lastPosition.current.x = x;
      toggleDirection("left");
    }
    if (y > lastPosition.current?.y) {
      lastPosition.current.y = y;
      toggleDirection("up");
    } else if (y < lastPosition.current?.y) {
      lastPosition.current.y = y;
      toggleDirection("down");
    }
  }, [directions, ref, x, y]);

  return directions;
};
