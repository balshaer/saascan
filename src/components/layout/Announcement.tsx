import { cssVars } from '../../utils/cssVariables';

const Announcement = () => {
  return (
    <div
      role="alert"
      className="w-full text-center py-2 font-semibold"
      style={{
        backgroundColor: cssVars.warning,
        color: cssVars.inverse,
      }}
    >
      ⚠️ This version is still under development. Some features may not work as expected.
    </div>
  );
};

export default Announcement;
