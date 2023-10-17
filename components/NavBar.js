import NavLink from './NavLink';

export default function NavBar() {
  return (
    <nav>
      <ul className="flex gap-2">
        <li className="font-bold font-orbitron">
          <NavLink href="/">
            GPTLet
          </NavLink>
        </li>
        <li className="ml-auto">
          <NavLink href="/apps">
            Apps
          </NavLink>
        </li>
        <li>
          <NavLink href="/about" prefetch={false}>
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
