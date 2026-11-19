import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Compass,
  CalendarDays,
  Settings,
  FileText,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  X,
  ClipboardList,
} from "lucide-react";

function Navbar({ displayName, collapsed, setCollapsed }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "My Courses", path: "/courses", icon: BookOpen },
    { name: "Explore", path: "/explore", icon: Compass },
    { name: "Study Planner", path: "/study-planner", icon: CalendarDays },
    { name: "Assignments", path: "/assignments", icon: ClipboardList },
    { name: "Notes", path: "/notes", icon: FileText },
    { name: "Settings", path: "/settings", icon: Settings },
    
    
  ];

  return (
    <>
      <button
        className="mobile-menu-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation"
      >
        {mobileOpen ? <X /> : <Menu />}
      </button>

      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      <aside
        className={`sidebar ${collapsed ? "collapsed" : ""} ${
          mobileOpen ? "mobile-open" : ""
        }`}
      >
        <div className="sidebar-header">
          {!collapsed && <h2>StudentHub</h2>}

          <button
            className="collapse-button"
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Collapse sidebar"
          >
            {collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
          </button>
        </div>

        {!collapsed && (
          <div className="sidebar-welcome">
            <p>Welcome, {displayName || "Student"}!</p>
          </div>
        )}

        <nav className="sidebar-links">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                title={collapsed ? item.name : ""}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
              >
                <Icon size={20} />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default Navbar;