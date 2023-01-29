export default function NotebookTable({ notebooks = [] }) {
  return (
    <div className="notebook-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Created at</th>
            <th>Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notebooks.map((notebook) => {
            return (
              <tr key={notebook.id}>
                <td>{notebook.title}</td>
                <td>{notebook.created_at}</td>
                <td>{notebook.updated_at}</td>
                <td>edit, delete</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
