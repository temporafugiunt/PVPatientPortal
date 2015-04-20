using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ngPVM.Web.Helpers.Common
{
  public static class ExtensionMethods
  {
    public static bool IsNullOrEmpty(this string str)
    {
      return (String.IsNullOrEmpty(str));
    }
  }
}