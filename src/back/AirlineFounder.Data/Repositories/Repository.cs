using AirlineFounder.Core.Interfaces;
using AirlineFounder.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace AirlineFounder.Data.Repositories;

public class Repository<T> : IRepository<T> where T : class
{
    protected readonly AirlineDbContext _context;
    protected readonly DbSet<T> _set;

    public Repository(AirlineDbContext context)
    {
        _context = context;
        _set = context.Set<T>();
    }

    public async Task<T?> GetByIdAsync(int id) => await _set.FindAsync(id);
    public async Task<IEnumerable<T>> GetAllAsync() => await _set.ToListAsync();
    public async Task AddAsync(T entity) => await _set.AddAsync(entity);
    public Task UpdateAsync(T entity) { _set.Update(entity); return Task.CompletedTask; }
    public Task DeleteAsync(T entity) { _set.Remove(entity); return Task.CompletedTask; }
    public async Task SaveChangesAsync() => await _context.SaveChangesAsync();
}
