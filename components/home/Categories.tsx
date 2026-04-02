import { fetcher } from '@/lib/coingecko.actions';
import React from 'react';
import DataTable from '../DataTable';
import Image from 'next/image';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { cn, formatPercentage } from '@/lib/utils';

const Categories = async () => {
  const categories = await fetcher<Category[]>('/coins/categories');
  const columnes: DataTableColumn<Category>[] = [
    {
      header: 'Category',
      cell: (category) => category.name,
      cellClassName: 'category-cell',
    },
    {
      header: 'Top Gainers',
      cell: (category) =>
        category.top_3_coins.map((coin) => (
          <Image src={coin} key={coin} alt={coin} width={28} height={28} />
        )),
      cellClassName: 'top-gainers-cell',
    },
    {
      header: '24h Change',
      cell: (coin) => {
        const isTrendingUp = coin.market_cap_change_24h > 0;
        return (
          <div className={cn('change-cell', isTrendingUp ? 'text-green-500' : 'text-red-500')}>
            <div>
              {isTrendingUp ? (
                <div className="flex flex-col items-center">
                  <TrendingUp width={16} height={16} />
                  <p>{formatPercentage(coin.market_cap_change_24h)}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <TrendingDown width={16} height={16} />
                  <p>{formatPercentage(coin.market_cap_change_24h)}</p>
                </div>
              )}
            </div>
          </div>
        );
      },
      cellClassName: 'change-header-cell',
    },
    {
      header: 'Market Cap',
      cell: (category) => category.market_cap,
      cellClassName: 'market-cap-cell',
    },
    {
      header: '24h Volume',
      cell: (category) => category.volume_24h,
      cellClassName: 'volume-cell',
    },
  ];
  return (
    <div id="categories" className="cursor-scrollbar">
      <h4>Top Categories</h4>
      <DataTable
        columns={columnes}
        data={categories?.slice(0, 10)}
        rowKey={(category) => category.name}
      />
    </div>
  );
};

export default Categories;
