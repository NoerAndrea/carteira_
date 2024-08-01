import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch, Store } from ".";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector = useSelector.withTypes<Store>();
