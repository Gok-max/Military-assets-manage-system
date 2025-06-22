export default function FilterForm({ filters, setFilters, onSearch, fields }) {
    return (
      <div className="flex gap-2 mb-4 flex-wrap">
        {fields.map(field => (
          <input
            key={field.name}
            className="border p-1 rounded"
            placeholder={field.placeholder}
            value={filters[field.name] || ''}
            onChange={(e) => setFilters({ ...filters, [field.name]: e.target.value })}
          />
        ))}
        <button onClick={onSearch} className="bg-blue-600 text-white p-1 rounded">
          Search
        </button>
      </div>
    );
  }
  