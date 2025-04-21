import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  useInviteAdmin,
  useDisableUser,
  useEnableUser,
  useGetAllAdminUsers,
} from "../../lib/hooks";
import Spinner from "../micro/spinner";
import dayjs from "dayjs";
import Button from "../micro/button";
import clsx from "clsx";
import ModalComponent from "../micro/modal";
import { useState } from "react";
import TextInput from "../micro/inputs/input";
import SelectInput from "../micro/inputs/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inviteAdminUserSchema, InviteAdminUserType } from "./schema";

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const { mutate: inviteAdmin, isPending } = useInviteAdmin();
  const { mutate: disableUser } = useDisableUser();
  const { mutate: enableUser } = useEnableUser();
  const { data: users, isLoading } = useGetAllAdminUsers();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<InviteAdminUserType>({
    defaultValues: {
      email: "",
      role: "ADMIN",
    },
    resolver: zodResolver(inviteAdminUserSchema),
  });

  const onSubmit = (data: InviteAdminUserType) => {
    inviteAdmin(data);
  };

  if (isLoading)
    return (
      <div className="flex w-full justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  return (
    <div className="mt-10">
      <div className="flex justify-between w-full items-center mb-10">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button onClick={() => setShowModal(true)}>Add User</Button>
      </div>
      <TableContainer>
        <Table
          sx={{ minWidth: 1000, cursor: "pointer" }}
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left"> Created At</TableCell>
              <TableCell>Unique Id</TableCell>
              <TableCell align="left">Email Address</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell align="left">
                  {dayjs(user.createdAt).format("MMM DD, YYYY • hh:mm A")}
                </TableCell>
                <TableCell align="left">{user._id}</TableCell>
                <TableCell align="left">{user.email}</TableCell>
                <TableCell align="left">{user.role}</TableCell>
                <TableCell align="left">
                  <p
                    className={clsx("p-2 rounded-sm", {
                      "bg-green-700/80 text-white": user.status === "ACTIVE",
                      "bg-red-500/70 text-white": user.status === "INACTIVE",
                    })}
                  >
                    {user.status}
                  </p>
                </TableCell>
                <TableCell align="left">
                  {user.status === "ACTIVE" ? (
                    <Button
                      size="s"
                      className="p-2 !w-fit"
                      isLoading={user.role !== "ADMIN"}
                      onClick={() => disableUser({ email: user.email })}
                    >
                      Disable User
                    </Button>
                  ) : (
                    <Button
                      size="s"
                      className="p-2 !w-fit"
                      isLoading={user.role !== "ADMIN"}
                      onClick={() => enableUser({ email: user.email })}
                    >
                      Enable User
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalComponent
        title="Add User"
        open={showModal}
        handleClose={() => setShowModal(false)}
      >
        <form
          className="flex flex-col gap-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput
            placeholder="Enter your email address"
            register={register("email")}
            error={errors.email?.message}
            name="email"
          />
          <SelectInput
            label="Select a role"
            register={register("role")}
            defaultValue="Select a role"
            error={errors.role?.message}
            name="role"
            options={[
              { value: "ADMIN", label: "Admin" },
              { value: "SUPER_ADMIN", label: "Super Admin" },
            ]}
          ></SelectInput>
          <Button size="l" className="w-full" dark isLoading={isPending}>
            Submit
          </Button>
        </form>
      </ModalComponent>
    </div>
  );
};

export default Users;
