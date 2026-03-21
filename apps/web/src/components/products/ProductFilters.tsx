'use client';

export function ProductFilters() {
  return (
    <section className="flex flex-wrap items-center gap-4 mb-12">
      <div className="flex items-center gap-2 bg-surface-container-low px-4 py-3 rounded-full text-secondary font-bold">
        <span className="material-symbols-outlined text-[20px]">filter_list</span>
        <span>Filters:</span>
      </div>
      
      <button className="bg-surface-container-highest px-6 py-3 rounded-full flex items-center gap-2 text-on-surface-variant font-bold hover:bg-secondary-container transition-all">
        <span>Sort</span>
        <span className="material-symbols-outlined text-[20px]">keyboard_arrow_down</span>
      </button>
      
      <button className="bg-surface-container-highest px-6 py-3 rounded-full flex items-center gap-2 text-on-surface-variant font-bold hover:bg-secondary-container transition-all">
        <span>Price</span>
        <span className="material-symbols-outlined text-[20px]">keyboard_arrow_down</span>
      </button>
      
      <button className="bg-surface-container-highest px-6 py-3 rounded-full flex items-center gap-2 text-on-surface-variant font-bold hover:bg-secondary-container transition-all">
        <span>Age Range</span>
        <span className="material-symbols-outlined text-[20px]">keyboard_arrow_down</span>
      </button>
      
      <div className="ml-auto flex items-center gap-4 w-full md:w-auto justify-between md:justify-end mt-4 md:mt-0">
        <span className="text-sm font-bold text-on-surface-variant">Showing 4 products</span>
        <div className="flex gap-2">
          <button className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[20px]">grid_view</span>
          </button>
          <button className="h-10 w-10 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[20px]">view_list</span>
          </button>
        </div>
      </div>
    </section>
  );
}
