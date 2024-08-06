// __tests__/DataTable.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Chip, Rating, Stack } from '@mui/material'
import Products from '../app/products/page'
import { useRouter } from 'next/navigation'

const columns = [
    {
        header: "Id",
        accessorKey: "id",
    },
    {
        header: "Title",
        accessorKey: "title",
    },
    {
        header: "Description",
        accessorKey: "description",
    },
    {
        header: "Category",
        accessorKey: "category",
    },
    {
        header: "Price",
        accessorKey: "price",
    },
    {
        header: "Percentage",
        accessorKey: "discountPercentage",
    },
    {
        header: "Rating",
        accessorKey: "rating",
        cell: (row: any) => {
            return (
                <Rating
                    value={row.getValue()}
                    size="small"
                    readOnly
                    precision={0.1}
                />
            )
        },
    },
    {
        header: "Stock",
        accessorKey: "stock",
    },
    {
        header: "Tags",
        accessorKey: "tags",
        cell: (row: any) => {
            return <Stack spacing={1}>
                {row.getValue().map((tag) => <Chip key={tag} label={tag} />)}
            </Stack>
        }
    },
    {
        header: "Brand",
        accessorKey: "brand",
    },
    {
        header: "Action",
        accessorKey: "id",
    },
]

const data = [
  {
    id: 1,
    title: "Test",
    description: "Described",
    category: "sales",
    price: 3.49,
    discountPercentage: 11,
    rating: 4,
    stock: "sales",
    tags: ["jest", "next"],
    brand: "react",
  },
];

const mockRouter = {
  push: jest.fn(),
  prefetch: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
};

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => mockRouter),
    usePathname: jest.fn(() => '/'),
    useSearchParams: jest.fn(() => new URLSearchParams()),
}));

describe('Products', () => {
  it('should render the table with correct headers', () => {
    render(<Products testColumns={columns} testData={data} />);
    
    expect(screen.getByText(/Id/i)).toBeInTheDocument();
    expect(screen.getByText(/Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Description/i)).toBeInTheDocument();
    expect(screen.getByText(/Category/i)).toBeInTheDocument();
    expect(screen.getByText(/Price/i)).toBeInTheDocument();
    expect(screen.getByText(/Percentage/i)).toBeInTheDocument();
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
    expect(screen.getByText(/Stock/i)).toBeInTheDocument();
    expect(screen.getByText(/Tags/i)).toBeInTheDocument();
    expect(screen.getByText(/Brand/i)).toBeInTheDocument();
    expect(screen.getByText(/Action/i)).toBeInTheDocument();
  });

});
