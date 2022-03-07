import Head from "next/head"
import Image from "next/image"
import SettingsLayout from "../layouts/documentation"
import Layout from "../layouts/main"
import getMainLayout from "../layouts/main"
import styles from "../styles/Home.module.css"

export default function Documentation() {
  return <div className="text-center">Documentation</div>
}

Documentation.PrimaryLayout = Layout
Documentation.SecondaryLayout = SettingsLayout
