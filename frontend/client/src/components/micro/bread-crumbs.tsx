import { Link } from "react-router";
import { Fragment } from "react";
import { FaAngleRight } from "react-icons/fa";

type Props = {
  crumbs: Breadcrumb[];
};

type Breadcrumb = {
  title: string;
  link?: string;
};

export function Breadcrumbs({ crumbs }: Props) {
  return (
    <div className="flex mb-6 items-center gap-2 text-sm font-medium text-black/60 font-light">
      {crumbs.map((crumb, i) => {
        return (
          <Fragment key={i}>
            {crumb.link ? (
              <Link to={crumb.link} className="hover:underline">
                {crumb.title}
              </Link>
            ) : (
              <p className="text-black">{crumb.title}</p>
            )}
            {i < crumbs.length - 1 && <FaAngleRight className="h-5 w-5" />}
          </Fragment>
        );
      })}
    </div>
  );
}
