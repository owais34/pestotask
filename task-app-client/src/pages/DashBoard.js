import { Fragment, useContext, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Task from "../components/Task";
import { GlobalStateContext } from "../utils/GlobalState";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { useDialog } from "../hooks/CustomHooks";
import CustomDialog from "../components/CustomDialog";
import { useNavigate } from "react-router-dom";
import Select from "../components/Select";

const userDefaults = {
  name: "...",
  email: "...",
  link:"http://localhost:5000/avatars/funEmoji-1.png"
};
const navigation = [
  { name: "Dashboard", href: "#", current: true }
];
const userNavigation = [
  { name: "Your Profile", href: "/profile" },
  { name: "Sign out", href: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const [state, dispatch] = useContext(GlobalStateContext);
  const { setDialogMessage, dialogMessage, setShowDialog, showDialog } =
    useDialog("");

  const [tasks , setTasks] = useState([])
  const [filterTasks, setFilterTasks] = useState([])
  const [select, setSelect] = useState("All")
  const [user, setUser] = useState({})

  const navigate = useNavigate()

  const getUserField = (field)=>{
    try {
      return user[field]
    } catch(e){

      return userDefaults[field]
    }
  }

  useEffect(()=>{
    if(select!=="All"){
      setFilterTasks(
        tasks.filter(task => task.status===select)
      )
    } else {
      setFilterTasks(tasks)
    }
  },[select])

  useEffect(() => {
      const config = {
        headers: { Authorization: `Bearer ${state.token}` },
      };

      // get task list
      axios
        .get(`${BASE_URL}/task`, config)
        .then((res) => {
          setTasks(res.data)
          setFilterTasks(res.data)
          dispatch({"type":"SET_TASK",payload: res.data})
        })
        .catch((err) => {
          console.log(err);
          if (
            err.response &&
            err.response.data &&
            err.response.data.message === "Invalid Token"
          ) {
            dispatch({type: "RESET"})
            navigate("/")
          } else {
            setDialogMessage("Something went wrong ! Please try again later");
          }
        });

     // get user data
      axios.get(`${BASE_URL}/user`,config)
      .then(response =>{
        setUser(response.data[0])
      })
      .catch(err=>{
        setDialogMessage("Something went wrong ! Please try again later");
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="min-h-full bg-gray-100">
        <Disclosure as="nav" className="bg-gray-800 min-w-full sticky top-0 z-50">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <h2 className="text-white font-mono bg-gray-700 text-2xl rounded-md px-3 py-2">
                        Task Manager
                      </h2>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={getUserField("link")}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <div
                                    onClick={()=>{navigate(item.href)}}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                    </div>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={getUserField("link")}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {getUserField("name")}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {getUserField("email")}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow sticky top-14 z-40">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
            <div className="flex">
              <Select label={"Filter by status : "} options={["To Do","In Progress","Completed","All"]} selected={select} setSelected={setSelect}/>
            </div>
            <div
              onClick={()=>navigate("/createTask")}
              className="rounded-md bg-green-500 px-3.5 py-2.5 text-lg font-semibold text-white-100 shadow-sm hover:bg-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300"
            >
              Create Task
            </div>
          </div>
        </header>
        <main>
          <div className="mx-auto flex flex-wrap max-w-7xl py-6 sm:px-6 lg:px-8">
            {filterTasks.map(task => <Task title={task.title} description={task.description} key={task.id} status={task.status} id={task.id}/>)}
          </div>
        </main>
      </div>
      <CustomDialog
        message={dialogMessage}
        open={showDialog}
        setOpen={setShowDialog}
      />
    </>
  );
}
