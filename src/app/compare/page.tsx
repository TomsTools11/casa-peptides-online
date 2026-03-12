import Breadcrumb from '@/components/layout/Breadcrumb';
import CompareTable from '@/components/compare/CompareTable';

export default function ComparePage() {
  return (
    <>
      <Breadcrumb items={[
        { label: 'Catalog', href: '/catalog' },
        { label: 'Compare' },
      ]} />
      <CompareTable />
    </>
  );
}
