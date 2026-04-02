import DataTable from '@/components/DataTable';

const CoinOverviewFallback = () => {
  return (
    <div id="coin-overview-fallback">
      <div className="header pt-2">
        <div className="skeleton header-image" />
        <div className="info">
          <div className="skeleton header-line-sm" />
          <div className="skeleton header-line-lg" />
        </div>
      </div>

      <div className="chart">
        <div className="skeleton chart-skeleton" />
      </div>
    </div>
  );
};

type TrendingRow = {
  id: string;
};

const trendingFallbackData: TrendingRow[] = Array.from({ length: 6 }, (_, index) => ({
  id: `fallback-${index}`,
}));

const renderNameSkeleton = () => (
  <div className="name-link">
    <div className="skeleton name-image" />
    <div className="skeleton name-line" />
  </div>
);

const renderChangeSkeleton = () => (
  <div className="price-change">
    <div className="skeleton change-icon" />
    <div className="skeleton change-line" />
  </div>
);

const renderPriceSkeleton = () => <div className="skeleton price-line" />;

const trendingFallbackColumns: DataTableColumn<TrendingRow>[] = [
  {
    header: 'Name',
    cell: renderNameSkeleton,
  },
  {
    header: '24h Change',
    cell: renderChangeSkeleton,
  },
  {
    header: 'Price',
    cell: renderPriceSkeleton,
  },
];

const TrendingCoinsOverviewFallback = () => {
  return (
    <div id="trending-coins-fallback">
      <DataTable
        columns={trendingFallbackColumns}
        data={trendingFallbackData}
        rowKey={(row) => row.id}
        tableClassName="trending-coins-table"
        headerCellClassName="py-3!"
        bodyCellClassName="py-2!"
      />
    </div>
  );
};

type CategoryRow = {
  id: string;
};

const categoriesFallbackData: CategoryRow[] = Array.from({ length: 10 }, (_, index) => ({
  id: `category-fallback-${index}`,
}));

const renderCategoryNameSkeleton = () => <div className="skeleton category-skeleton" />;

const renderTopGainersSkeleton = () => (
  <div className="top-gainers-cell">
    <div className="skeleton coin-skeleton" />
    <div className="skeleton coin-skeleton" />
    <div className="skeleton coin-skeleton" />
  </div>
);

const renderCategoryChangeSkeleton = () => (
  <div className="change-cell">
    <div className="skeleton change-icon" />
    <div className="skeleton value-skeleton-sm" />
  </div>
);

const renderMarketCapSkeleton = () => <div className="skeleton value-skeleton-lg" />;

const renderVolumeSkeleton = () => <div className="skeleton value-skeleton-md" />;

const categoriesFallbackColumns: DataTableColumn<CategoryRow>[] = [
  {
    header: 'Category',
    cell: renderCategoryNameSkeleton,
    cellClassName: 'category-cell',
  },
  {
    header: 'Top Gainers',
    cell: renderTopGainersSkeleton,
    cellClassName: 'top-gainers-cell',
  },
  {
    header: '24h Change',
    cell: renderCategoryChangeSkeleton,
    cellClassName: 'change-header-cell',
  },
  {
    header: 'Market Cap',
    cell: renderMarketCapSkeleton,
    cellClassName: 'market-cap-cell',
  },
  {
    header: '24h Volume',
    cell: renderVolumeSkeleton,
    cellClassName: 'volume-cell',
  },
];

const CategoriesFallback = () => {
  return (
    <div id="categories-fallback">
      <h4>Top Categories</h4>
      <DataTable
        columns={categoriesFallbackColumns}
        data={categoriesFallbackData}
        rowKey={(row) => row.id}
      />
    </div>
  );
};

// Backward-compatible alias for requested naming.
const CoinOverViewFallback = CoinOverviewFallback;

export {
  CategoriesFallback,
  CoinOverviewFallback,
  CoinOverViewFallback,
  TrendingCoinsOverviewFallback,
};
