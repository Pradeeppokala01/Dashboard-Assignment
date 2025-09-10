import React, { useState } from "react";
import "./App.css";

const initialData = {
  categories: [
    {
      id: "cspm",
      title: "CSPM Executive Dashboard",
      widgets: [
        {
          id: "cloud-accounts",
          name: "Cloud Accounts",
          content: "Connected and Not Connected status"
        },
        {
          id: "cloud-risk",
          name: "Cloud Account Risk Assessment",
          content: "Cloud risk summary content"
        }
      ]
    },
    {
      id: "cwpp",
      title: "CWPP Dashboard",
      widgets: [
        {
          id: "ns-alerts",
          name: "Top 5 Namespace Specific Alerts",
          content: "No graph data available!"
        },
        {
          id: "workload-alerts",
          name: "Workload Alerts",
          content: "No graph data available!"
        }
      ]
    }
  ],
  allWidgets: [
    {
      id: "cloud-accounts",
      name: "Cloud Accounts",
      content: "Connected and Not Connected status"
    },
    {
      id: "cloud-risk",
      name: "Cloud Account Risk Assessment",
      content: "Cloud risk summary content"
    },
    {
      id: "ns-alerts",
      name: "Top 5 Namespace Specific Alerts",
      content: "No graph data available!"
    },
    {
      id: "workload-alerts",
      name: "Workload Alerts",
      content: "No graph data available!"
    },
    {
      id: "image-risk",
      name: "Image Risk Assessment",
      content: "Image risk summary"
    }
  ]
};

function App() {
  const [categories, setCategories] = useState(initialData.categories);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddWidgetFor, setShowAddWidgetFor] = useState(null);
  const [newWidgetName, setNewWidgetName] = useState("");
  const [newWidgetContent, setNewWidgetContent] = useState("");

  const addWidget = (categoryId) => {
    if (!newWidgetName.trim() || !newWidgetContent.trim()) return;
    setCategories((prev) =>
      prev.map((c) => {
        if (c.id === categoryId) {
          const newWidget = {
            id: `w-${Date.now()}`,
            name: newWidgetName,
            content: newWidgetContent
          };
          return { ...c, widgets: [...c.widgets, newWidget] };
        }
        return c;
      })
    );
    setNewWidgetName("");
    setNewWidgetContent("");
    setShowAddWidgetFor(null);
  };

  const removeWidget = (categoryId, widgetId) => {
    setCategories((prev) =>
      prev.map((c) => {
        if (c.id === categoryId) {
          return {
            ...c,
            widgets: c.widgets.filter((w) => w.id !== widgetId)
          };
        }
        return c;
      })
    );
  };

  // Filter widgets for search
  const filteredWidgets = [];
  categories.forEach((cat) => {
    cat.widgets.forEach((w) => {
      if (w.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        filteredWidgets.push({ ...w, category: cat.title });
      }
    });
  });

  return (
    <div className="app">
      <h1>Dynamic Dashboard</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search widgets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {searchTerm && (
        <div className="search-results">
          <h3>Search Results:</h3>
          {filteredWidgets.length ? (
            filteredWidgets.map((w) => (
              <div key={w.id} className="widget-card">
                <strong>{w.name}</strong> (in {w.category})
                <p>{w.content}</p>
              </div>
            ))
          ) : (
            <p>No matching widgets found</p>
          )}
        </div>
      )}

      {!searchTerm &&
        categories.map((cat) => (
          <div key={cat.id} className="category">
            <h2>{cat.title}</h2>
            <div className="widget-list">
              {cat.widgets.map((w) => (
                <div key={w.id} className="widget-card">
                  <button
                    className="remove-btn"
                    onClick={() => removeWidget(cat.id, w.id)}
                    title="Remove widget"
                  >
                    ×
                  </button>
                  <strong>{w.name}</strong>
                  <p>{w.content}</p>
                </div>
              ))}

              <button
                className="add-widget-btn"
                onClick={() =>
                  setShowAddWidgetFor(showAddWidgetFor === cat.id ? null : cat.id)
                }
              >
                + Add Widget
              </button>

              {showAddWidgetFor === cat.id && (
                <div className="add-widget-form">
                  <input
                    type="text"
                    placeholder="Widget Name"
                    value={newWidgetName}
                    onChange={(e) => setNewWidgetName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Widget Content"
                    value={newWidgetContent}
                    onChange={(e) => setNewWidgetContent(e.target.value)}
                  />
                  <button onClick={() => addWidget(cat.id)}>Confirm</button>
                  <button onClick={() => setShowAddWidgetFor(null)}>Cancel</button>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

export default App;
