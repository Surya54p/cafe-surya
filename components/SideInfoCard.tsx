"use client";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface SideInfoItem {
  title: string;
  description: string;
}

interface SideInfoCardProps {
  heading: string;
  items: SideInfoItem[];
}

export default function SideInfoCard({ heading, items }: SideInfoCardProps) {
  return (
    <div className="bg-[#F7F9FB] rounded-[2rem] p-8 h-[450px] overflow-y-auto">
      <h3 className="font-bold text-black mb-6">{heading}</h3>

      <Table>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index} className="border-none">
              <TableCell className="py-3 px-0">
                <p className="text-sm font-medium text-gray-900">
                  {item.title}
                </p>
              </TableCell>

              <TableCell className="py-3 px-0">
                <p className="text-xs text-end text-gray-500">{item.description}</p>{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
